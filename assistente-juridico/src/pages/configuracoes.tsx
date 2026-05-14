import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Save, Eye, EyeOff, CheckCircle2, XCircle,
  Key, Shield, Database, Cpu, TestTube, Loader2, RefreshCw, Cloud, ExternalLink,
  Table2, Wifi, WifiOff, Info,
} from "lucide-react";

const API = "/api";

interface SystemStatus {
  hasGemini: boolean;
  hasOpenAI: boolean;
  hasPerplexity: boolean;
  hasDemo: boolean;
  hasDatajud: boolean;
  database: boolean;
  passwordProtected?: boolean;
}

interface DbStatus {
  connected: boolean;
  url?: string;
  error?: string;
}

interface DbTables {
  ok: boolean;
  tables?: string[];
  error?: string;
}

interface AppInfo {
  version: string;
  nodeVersion: string;
  uptime: number;
  memoryMB: number;
  databaseUrl: boolean;
}

export default function Configuracoes() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);
  const [show, setShow] = useState<Record<string, boolean>>({});

  const [config, setConfig] = useState({
    geminiKey: "",
    openaiKey: "",
    perplexityKey: "",
    demoKey: "",
    demoUrl: "",
    demoModel: "",
    datajudKey: "",
    driveFolder: "",
    driveToken: "",
  });

  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [dbTables, setDbTables] = useState<DbTables | null>(null);
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [dbTestUrl, setDbTestUrl] = useState("");
  const [testingDb, setTestingDb] = useState(false);
  const [loadingTables, setLoadingTables] = useState(false);
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });

  const loadAll = () => {
    fetch(`${API}/settings/ai-config`)
      .then(r => r.json())
      .then(d => setStatus(d))
      .catch(() => {});
    fetch(`${API}/settings/system-status`)
      .then(r => r.json())
      .then(d => setStatus(prev => ({ ...prev, ...d } as SystemStatus)))
      .catch(() => {});
    fetch(`${API}/settings/db-status`)
      .then(r => r.json())
      .then(d => setDbStatus(d))
      .catch(() => setDbStatus({ connected: false, error: "Servidor inacessível" }));
    fetch(`${API}/settings/app-info`)
      .then(r => r.json())
      .then(d => setAppInfo(d))
      .catch(() => {});
  };

  useEffect(() => { loadAll(); }, []);

  const toggleShow = (key: string) => setShow(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: Record<string, string> = {};
      if (config.geminiKey) body.geminiKey = config.geminiKey;
      if (config.openaiKey) body.openaiKey = config.openaiKey;
      if (config.perplexityKey) body.perplexityKey = config.perplexityKey;
      if (config.demoKey) body.demoKey = config.demoKey;
      if (config.demoUrl) body.demoUrl = config.demoUrl;
      if (config.demoModel) body.demoModel = config.demoModel;
      if (config.datajudKey) body.datajudKey = config.datajudKey;

      const res = await fetch(`${API}/settings/ai-config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Erro ao salvar");

      // Salvar chaves do Drive separadamente via env-set
      if (config.driveFolder) {
        await fetch(`${API}/settings/env-set`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "google_drive_folder_id", value: config.driveFolder }),
        });
      }
      if (config.driveToken) {
        await fetch(`${API}/settings/env-set`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "google_drive_access_token", value: config.driveToken }),
        });
      }

      const updated = await fetch(`${API}/settings/ai-config`).then(r => r.json());
      setStatus(updated);
      setConfig({ geminiKey: "", openaiKey: "", perplexityKey: "", demoKey: "", demoUrl: "", demoModel: "", datajudKey: "", driveFolder: "", driveToken: "" });
      toast({ title: "Configurações salvas com sucesso!" });
    } catch (err: any) {
      toast({ title: "Erro ao salvar", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleTestKey = async (key: string, keyId: string) => {
    if (!key.trim()) return;
    setTesting(keyId);
    try {
      const res = await fetch(`${API}/demo-key-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, url: config.demoUrl || undefined, model: config.demoModel || undefined }),
      });
      const data = await res.json();
      if (data.ok) {
        toast({ title: `Chave válida! Modelo: ${data.model}` });
      } else {
        toast({ title: "Chave inválida", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro ao testar chave", variant: "destructive" });
    } finally {
      setTesting(null);
    }
  };

  const handleTestDb = async () => {
    setTestingDb(true);
    try {
      const res = await fetch(`${API}/settings/db-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: dbTestUrl || undefined }),
      });
      const data = await res.json();
      if (data.ok) {
        toast({ title: "Banco conectado!", description: data.message });
        // refresh db status
        fetch(`${API}/settings/db-status`).then(r => r.json()).then(d => setDbStatus(d)).catch(() => {});
      } else {
        toast({ title: "Falha na conexão", description: data.message, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Erro ao testar banco", description: err.message, variant: "destructive" });
    } finally {
      setTestingDb(false);
    }
  };

  const handleLoadTables = async () => {
    setLoadingTables(true);
    try {
      const res = await fetch(`${API}/settings/db-init`, { method: "POST" });
      const data = await res.json();
      setDbTables(data);
      if (!data.ok) {
        toast({ title: "Erro ao listar tabelas", description: data.error, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setLoadingTables(false);
    }
  };

  const handleSavePassword = async () => {
    if (password.new !== password.confirm) {
      toast({ title: "Senhas não coincidem", variant: "destructive" });
      return;
    }
    try {
      const res = await fetch(`${API}/settings/app-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.new, currentPassword: password.current }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      setPassword({ current: "", new: "", confirm: "" });
      toast({ title: "Senha atualizada com sucesso!" });
    } catch (err: any) {
      toast({ title: "Erro ao atualizar senha", description: err.message, variant: "destructive" });
    }
  };

  const StatusBadge = ({ active }: { active?: boolean }) => (
    active
      ? <Badge variant="default" className="bg-green-600 text-xs">Configurado</Badge>
      : <Badge variant="outline" className="text-xs text-muted-foreground">Não configurado</Badge>
  );

  const KeyField = ({
    id, label, value, placeholder, description, hasValue,
  }: { id: string; label: string; value: string; placeholder: string; description?: string; hasValue?: boolean }) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm">{label}</Label>
        <StatusBadge active={hasValue} />
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id={id}
            type={show[id] ? "text" : "password"}
            value={value}
            onChange={e => setConfig(prev => ({ ...prev, [id]: e.target.value }))}
            placeholder={hasValue ? "••••••••••••••••" : placeholder}
            className="pr-10 font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => toggleShow(id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show[id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {value && (
          <Button
            variant="outline" size="sm"
            onClick={() => handleTestKey(value, id)}
            disabled={testing === id}
            className="shrink-0"
          >
            {testing === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <TestTube className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" />Voltar
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Configurações</h1>
            <p className="text-sm text-muted-foreground">Configure chaves de API, banco de dados e preferências</p>
          </div>
          <Button variant="ghost" size="sm" onClick={loadAll}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Status geral */}
        {status && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Cpu className="h-4 w-4" />Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Banco de Dados", active: dbStatus?.connected ?? status.database },
                  { label: "Gemini", active: status.hasGemini },
                  { label: "OpenAI", active: status.hasOpenAI },
                  { label: "Perplexity", active: status.hasPerplexity },
                  { label: "Custom/Demo", active: status.hasDemo },
                  { label: "DataJud CNJ", active: status.hasDatajud },
                ].map(({ label, active }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    {active
                      ? <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      : <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <span className={active ? "" : "text-muted-foreground"}>{label}</span>
                  </div>
                ))}
              </div>
              {appInfo && (
                <div className="mt-4 pt-3 border-t flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span><Info className="h-3 w-3 inline mr-1" />v{appInfo.version}</span>
                  <span>Node {appInfo.nodeVersion}</span>
                  <span>Uptime: {formatUptime(appInfo.uptime)}</span>
                  <span>RAM: {appInfo.memoryMB} MB</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Banco de Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4" />Banco de Dados
            </CardTitle>
            <CardDescription>
              Configure e teste a conexão com PostgreSQL (Neon, Supabase, Railway ou qualquer PostgreSQL).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status atual */}
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
              {dbStatus === null ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : dbStatus.connected ? (
                <Wifi className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <WifiOff className="h-5 w-5 text-destructive flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                {dbStatus === null ? (
                  <p className="text-sm text-muted-foreground">Verificando conexão...</p>
                ) : dbStatus.connected ? (
                  <>
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">Conectado</p>
                    {dbStatus.url && <p className="text-xs text-muted-foreground truncate">{dbStatus.url}</p>}
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-destructive">Sem conexão</p>
                    {dbStatus.error && <p className="text-xs text-muted-foreground">{dbStatus.error}</p>}
                  </>
                )}
              </div>
            </div>

            {/* Testar outra URL */}
            <div className="space-y-2">
              <Label className="text-sm">Testar URL de conexão</Label>
              <p className="text-xs text-muted-foreground">
                Cole a URL do Neon, Supabase ou outro PostgreSQL para testar antes de configurar no ambiente.
                Formato: <code className="bg-muted px-1 rounded text-xs">postgresql://user:senha@host/db?sslmode=require</code>
              </p>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={dbTestUrl}
                  onChange={e => setDbTestUrl(e.target.value)}
                  placeholder="postgresql://user:senha@host.neon.tech/dbname?sslmode=require"
                  className="font-mono text-xs"
                />
                <Button
                  variant="outline"
                  onClick={handleTestDb}
                  disabled={testingDb}
                  className="shrink-0"
                >
                  {testingDb ? <Loader2 className="h-4 w-4 animate-spin" /> : <TestTube className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Listar tabelas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Tabelas no banco atual</Label>
                <Button variant="ghost" size="sm" onClick={handleLoadTables} disabled={loadingTables}>
                  {loadingTables
                    ? <Loader2 className="h-3 w-3 animate-spin" />
                    : <Table2 className="h-3 w-3" />}
                  <span className="ml-1 text-xs">Listar</span>
                </Button>
              </div>
              {dbTables && (
                dbTables.ok ? (
                  dbTables.tables && dbTables.tables.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {dbTables.tables.map(t => (
                        <Badge key={t} variant="secondary" className="text-xs font-mono">{t}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Nenhuma tabela encontrada. Execute <code className="bg-muted px-1 rounded">pnpm --filter @workspace/db run push</code> para criar o schema.</p>
                  )
                ) : (
                  <p className="text-xs text-destructive">{dbTables.error}</p>
                )
              )}
            </div>

            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg space-y-1">
              <p className="font-medium">Como configurar Neon (gratuito):</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>Acesse <strong>neon.tech</strong> → crie conta → novo projeto</li>
                <li>Copie a <strong>Connection String</strong> (com sslmode=require)</li>
                <li>Defina como variável de ambiente <code className="bg-muted px-1 rounded">DATABASE_URL</code></li>
                <li>Execute <code className="bg-muted px-1 rounded">pnpm --filter @workspace/db run push</code></li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* AI Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4" />Chaves de API de IA
            </CardTitle>
            <CardDescription>
              Todas as chaves são armazenadas localmente no banco de dados, nunca nos servidores da Replit.
              A IA usa apenas suas próprias chaves.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <KeyField
              id="geminiKey"
              label="Google Gemini API Key"
              value={config.geminiKey}
              placeholder="AIza..."
              description="Obtido em aistudio.google.com — gratuito com bom limite diário"
              hasValue={status?.hasGemini}
            />
            <Separator />
            <KeyField
              id="openaiKey"
              label="OpenAI API Key"
              value={config.openaiKey}
              placeholder="sk-..."
              description="Obtido em platform.openai.com"
              hasValue={status?.hasOpenAI}
            />
            <Separator />
            <KeyField
              id="perplexityKey"
              label="Perplexity API Key"
              value={config.perplexityKey}
              placeholder="pplx-..."
              description="Obtido em perplexity.ai/api — pesquisa em tempo real na internet"
              hasValue={status?.hasPerplexity}
            />
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Chave Custom / Demo (compatível OpenAI)</Label>
                <StatusBadge active={status?.hasDemo} />
              </div>
              <p className="text-xs text-muted-foreground">
                Qualquer provedor compatível com OpenAI: Groq, Together, OpenRouter, xAI, Anthropic proxy, etc.
              </p>
              <KeyField id="demoKey" label="Chave API" value={config.demoKey} placeholder="sk-... ou gsk_..." hasValue={status?.hasDemo} />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">URL Base</Label>
                  <Input
                    value={config.demoUrl}
                    onChange={e => setConfig(prev => ({ ...prev, demoUrl: e.target.value }))}
                    placeholder="https://api.groq.com/openai/v1"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Modelo</Label>
                  <Input
                    value={config.demoModel}
                    onChange={e => setConfig(prev => ({ ...prev, demoModel: e.target.value }))}
                    placeholder="llama-3.3-70b-versatile"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
            <Separator />
            <KeyField
              id="datajudKey"
              label="Chave DataJud CNJ"
              value={config.datajudKey}
              placeholder="Sua chave do CNJ..."
              description="Para busca de jurisprudência. Obtenha em datajud-wiki.cnj.jus.br"
              hasValue={status?.hasDatajud}
            />

            <Separator />

            {/* Google Drive */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Google Drive</span>
                <a
                  href="https://developers.google.com/oauthplayground"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  Obter token <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                Configure o token OAuth e pasta para enviar documentos diretamente ao Google Drive pelo botão "Drive" na tela principal.
              </p>
              <div className="space-y-1.5">
                <Label className="text-xs">ID da Pasta no Drive</Label>
                <Input
                  value={config.driveFolder}
                  onChange={e => setConfig(prev => ({ ...prev, driveFolder: e.target.value }))}
                  placeholder="Ex: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
                  className="text-sm font-mono"
                />
                <p className="text-xs text-muted-foreground">ID da URL do Google Drive (após /folders/)</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Token de Acesso OAuth</Label>
                <Input
                  type="password"
                  value={config.driveToken}
                  onChange={e => setConfig(prev => ({ ...prev, driveToken: e.target.value }))}
                  placeholder="ya29.xxxxxxxx"
                  className="text-sm font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Obtenha em <a href="https://developers.google.com/oauthplayground" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">OAuth Playground</a> — selecione Drive API v3 e authorize.
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Salvando...</> : <><Save className="h-4 w-4 mr-2" />Salvar Configurações</>}
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={() => window.location.href = "/admin"}>
                <Shield className="h-3.5 w-3.5" />Painel Administrativo (vars, DB, rotas)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />Proteção por Senha
            </CardTitle>
            <CardDescription>Proteja o acesso ao sistema com senha opcional</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Senha Atual (se existir)</Label>
              <Input type="password" value={password.current} onChange={e => setPassword(p => ({ ...p, current: e.target.value }))} placeholder="Senha atual" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Nova Senha</Label>
              <Input type="password" value={password.new} onChange={e => setPassword(p => ({ ...p, new: e.target.value }))} placeholder="Nova senha (em branco para remover)" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Confirmar Nova Senha</Label>
              <Input type="password" value={password.confirm} onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))} placeholder="Confirme a nova senha" />
            </div>
            <Button variant="outline" onClick={handleSavePassword} className="w-full">
              <Shield className="h-4 w-4 mr-2" />Atualizar Senha
            </Button>
          </CardContent>
        </Card>

        {/* PWA Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Cpu className="h-4 w-4" />Instalação como App (PWA)
            </CardTitle>
            <CardDescription>Instale o SK Jurídico como aplicativo no celular ou computador</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">Android / Chrome:</p>
              <p>Menu (⋮) → "Adicionar à tela inicial" ou "Instalar app"</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">iPhone / Safari:</p>
              <p>Botão Compartilhar → "Adicionar à Tela de Início"</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">Desktop Chrome/Edge:</p>
              <p>Ícone de instalação na barra de endereço → "Instalar"</p>
            </div>
            <p className="text-xs">
              O app funciona offline para a interface. As funcionalidades de IA requerem conexão com a internet.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
