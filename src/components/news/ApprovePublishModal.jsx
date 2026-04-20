import { useEffect, useMemo, useState } from "react";

const ALLOWED_MANUAL_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
const MAX_MANUAL_IMAGE_SIZE = 5 * 1024 * 1024;
const MODES = {
  WEB: "web",
  LINKEDIN: "linkedin",
};

function normalizeValue(value) {
  return String(value || "").trim();
}

function buildWebGeminiPrompt(item) {
  const baseTitle = normalizeValue(item?.aiWebTitle) || normalizeValue(item?.titleOriginal);

  return [
    "Genera una imagen profesional y corporativa para ilustrar una noticia editorial.",
    `Tema principal: ${baseTitle || "noticia empresarial actual"}.`,
    "Estilo realista o editorial profesional.",
    "Composicion limpia, moderna y creible.",
    "Relacionada claramente con el tema de la noticia.",
    "Sin texto incrustado, sin logos, sin marcas de agua y sin interfaz.",
    "Iluminacion natural, acabado premium y enfoque apto para portada web.",
  ].join(" ");
}

function buildLinkedinGeminiPrompt(item) {
  const baseText =
    normalizeValue(item?.aiLinkedinPost) ||
    normalizeValue(item?.aiWebTitle) ||
    normalizeValue(item?.titleOriginal);

  return [
    "Genera una imagen profesional, corporativa y limpia para acompanar una publicacion de LinkedIn.",
    `Concepto base: ${baseText || "actualidad empresarial del sector dental y salud"}.`,
    "Debe resultar atractiva para social media y LinkedIn.",
    "Estilo realista o editorial profesional.",
    "Composicion clara, moderna y creible.",
    "Sin texto incrustado, sin logos, sin marcas de agua y sin interfaz.",
    "Acabado premium, luminoso y alineado con una marca corporativa.",
  ].join(" ");
}

function PreviewImage({ src, alt }) {
  if (!src) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
        Sin vista previa
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      <img src={src} alt={alt} className="h-40 w-full object-cover" />
    </div>
  );
}

function CopyButton({ copied, disabled = false, onClick, label = "Copiar", copiedLabel = "Copiado" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

function SectionCard({ title, children, tone = "default" }) {
  const toneClass =
    tone === "subtle"
      ? "border-slate-200 bg-slate-50"
      : tone === "warning"
        ? "border-amber-300 bg-amber-50"
        : "border-slate-200 bg-white";

  return (
    <section className={`rounded-2xl border p-4 ${toneClass}`}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ApprovePublishModal({
  open,
  item,
  loading = false,
  error = "",
  onClose,
  onSubmit,
}) {
  const hasAiContent = useMemo(() => {
    return Boolean(normalizeValue(item?.aiWebContent));
  }, [item?.aiWebContent]);

  const hasOriginalImage = useMemo(() => {
    return Boolean(normalizeValue(item?.featuredImageUrl));
  }, [item?.featuredImageUrl]);

  const linkedinPost = normalizeValue(item?.aiLinkedinPost);
  const linkedinHashtags = normalizeValue(item?.aiLinkedinHashtags);
  const alreadyUploadedToWordPress =
    normalizeValue(item?.syncStatus || item?.status).toLowerCase() === "subida";

  const [mode, setMode] = useState(MODES.WEB);
  const [contentSource, setContentSource] = useState(hasAiContent ? "ai" : "original");
  const [imageSource, setImageSource] = useState(hasOriginalImage ? "original" : "none");
  const [manualImageFile, setManualImageFile] = useState(null);
  const [manualImagePreview, setManualImagePreview] = useState("");
  const [manualImageError, setManualImageError] = useState("");
  const [confirmOriginalContent, setConfirmOriginalContent] = useState(false);
  const [copyState, setCopyState] = useState({
    post: false,
    hashtags: false,
    complete: false,
    prompt: false,
  });

  useEffect(() => {
    if (!open) return;

    setMode(MODES.WEB);
    setContentSource(hasAiContent ? "ai" : "original");
    setImageSource(hasOriginalImage ? "original" : "none");
    setManualImageFile(null);
    setManualImagePreview("");
    setManualImageError("");
    setConfirmOriginalContent(false);
    setCopyState({
      post: false,
      hashtags: false,
      complete: false,
      prompt: false,
    });
  }, [open, hasAiContent, hasOriginalImage, item?.id]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape" && !loading) {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, loading, onClose]);

  useEffect(() => {
    if (!manualImageFile) {
      setManualImagePreview("");
      return undefined;
    }

    const nextPreview = URL.createObjectURL(manualImageFile);
    setManualImagePreview(nextPreview);

    return () => URL.revokeObjectURL(nextPreview);
  }, [manualImageFile]);

  if (!open) return null;

  const itemTitle = normalizeValue(item?.titleOriginal) || "sin titulo";
  const aiTitle = normalizeValue(item?.aiWebTitle) || "Sin titulo IA web";
  const aiExcerpt = normalizeValue(item?.aiWebExcerpt) || "Sin extracto IA web";
  const webGeminiPrompt = buildWebGeminiPrompt(item);
  const linkedinGeminiPrompt = buildLinkedinGeminiPrompt(item);
  const originalWarningRequired = contentSource === "original";
  const canSubmitWeb =
    !loading &&
    !alreadyUploadedToWordPress &&
    contentSource &&
    (!originalWarningRequired || confirmOriginalContent) &&
    (imageSource !== "manual" || (manualImageFile && !manualImageError));
  const hasLinkedinPost = Boolean(linkedinPost);
  const hasLinkedinHashtags = Boolean(linkedinHashtags);
  const completeLinkedinText = [linkedinPost, linkedinHashtags].filter(Boolean).join("\n\n");

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget || loading) return;
    onClose?.();
  }

  function handleManualImageChange(event) {
    const file = event.target.files?.[0] || null;
    setManualImageError("");

    if (!file) {
      setManualImageFile(null);
      return;
    }

    if (!ALLOWED_MANUAL_IMAGE_TYPES.includes(file.type)) {
      setManualImageFile(null);
      setManualImageError("La imagen manual debe ser JPG, PNG, WEBP, GIF o AVIF");
      return;
    }

    if (Number(file.size || 0) > MAX_MANUAL_IMAGE_SIZE) {
      setManualImageFile(null);
      setManualImageError("La imagen manual no puede superar los 5 MB");
      return;
    }

    setManualImageFile(file);
    setImageSource("manual");
  }

  function handleContentSourceChange(nextSource) {
    setContentSource(nextSource);
    if (nextSource !== "original") {
      setConfirmOriginalContent(false);
    }
  }

  function handleSubmitWeb() {
    if (!canSubmitWeb) return;

    onSubmit?.({
      contentSource,
      imageSource,
      manualImageFile,
    });
  }

  function openLinkedin() {
    window.open("https://www.linkedin.com/feed/", "_blank", "noopener,noreferrer");
  }

  async function copyToClipboard(key, value) {
    if (!normalizeValue(value)) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopyState((prev) => ({
        ...prev,
        [key]: true,
      }));

      window.setTimeout(() => {
        setCopyState((prev) => ({
          ...prev,
          [key]: false,
        }));
      }, 1800);
    } catch (copyError) {
      console.warn("No se pudo copiar al portapapeles", copyError);
    }
  }

  function renderModeTabs() {
    return (
      <div className="mt-4 inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
        {[MODES.WEB, MODES.LINKEDIN].map((tab) => {
          const isActive = mode === tab;
          const label = tab === MODES.WEB ? "Web" : "LinkedIn";

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setMode(tab)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  function renderWebTab() {
    return (
      <div className="space-y-6">
        <SectionCard title="Resumen de la version web IA" tone="subtle">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Titulo web IA
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">{aiTitle}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Extracto web IA
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">{aiExcerpt}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Contenido a subir">
          {alreadyUploadedToWordPress ? (
            <div className="mb-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              Esta noticia ya ha sido subida a WordPress.
            </div>
          ) : null}

          <div className="space-y-3">
            <label
              className={`block rounded-2xl border p-4 transition ${
                contentSource === "ai"
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 bg-white"
              } ${hasAiContent ? "" : "cursor-not-allowed opacity-60"}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="content-source"
                  checked={contentSource === "ai"}
                  disabled={!hasAiContent || loading || alreadyUploadedToWordPress}
                  onChange={() => handleContentSourceChange("ai")}
                  className="mt-1 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Usar contenido IA web
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Titulo: `aiWebTitle` con fallback a `titleOriginal`, extracto desde
                    `aiWebExcerpt` y contenido desde `aiWebContent`.
                  </div>
                  {!hasAiContent ? (
                    <div className="mt-2 text-sm text-amber-700">
                      Esta opcion no esta disponible porque falta `aiWebContent`.
                    </div>
                  ) : null}
                </div>
              </div>
            </label>

            <label
              className={`block rounded-2xl border p-4 transition ${
                contentSource === "original"
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="content-source"
                  checked={contentSource === "original"}
                  disabled={loading || alreadyUploadedToWordPress}
                  onChange={() => handleContentSourceChange("original")}
                  className="mt-1 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Usar contenido original/editado
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Titulo desde `titleOriginal`, extracto desde `summary` y contenido
                    desde `contentText`.
                  </div>
                </div>
              </div>
            </label>
          </div>

          {contentSource === "original" ? (
            <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-900">
                Estas seguro de que quieres subir el contenido original? Podria
                contener publicidad, referencias a otras webs o contenido no adaptado a
                Ponter.
              </p>
              <label className="mt-3 flex items-start gap-3 text-sm text-amber-900">
                <input
                  type="checkbox"
                  checked={confirmOriginalContent}
                  disabled={loading || alreadyUploadedToWordPress}
                  onChange={(event) => setConfirmOriginalContent(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-amber-400 text-amber-700 focus:ring-amber-500"
                />
                <span>Confirmo que quiero subir el contenido original.</span>
              </label>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Imagen destacada">
          <div className="grid gap-4 lg:grid-cols-3">
            <label
              className={`rounded-2xl border p-4 transition ${
                imageSource === "original"
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 bg-white"
              } ${hasOriginalImage ? "" : "opacity-60"}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="image-source"
                  checked={imageSource === "original"}
                  disabled={!hasOriginalImage || loading || alreadyUploadedToWordPress}
                  onChange={() => setImageSource("original")}
                  className="mt-1 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">
                    Subir con la foto original
                  </div>
                  <div className="mt-2">
                    <PreviewImage
                      src={hasOriginalImage ? item.featuredImageUrl : ""}
                      alt={itemTitle}
                    />
                  </div>
                  {!hasOriginalImage ? (
                    <div className="mt-2 text-sm text-amber-700">
                      Esta noticia no tiene foto original disponible.
                    </div>
                  ) : null}
                </div>
              </div>
            </label>

            <label
              className={`rounded-2xl border p-4 transition ${
                imageSource === "manual"
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="image-source"
                  checked={imageSource === "manual"}
                  disabled={loading || alreadyUploadedToWordPress}
                  onChange={() => setImageSource("manual")}
                  className="mt-1 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">
                    Subir una foto manualmente
                  </div>
                  <div className="mt-3">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      disabled={loading || alreadyUploadedToWordPress}
                      onChange={handleManualImageChange}
                      className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
                    />
                  </div>
                  {manualImageError ? (
                    <div className="mt-2 text-sm text-rose-700">
                      {manualImageError}
                    </div>
                  ) : null}
                  <div className="mt-3">
                    <PreviewImage src={manualImagePreview} alt="Vista previa manual" />
                  </div>
                </div>
              </div>
            </label>

            <label
              className={`rounded-2xl border p-4 transition ${
                imageSource === "none"
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="image-source"
                  checked={imageSource === "none"}
                  disabled={loading || alreadyUploadedToWordPress}
                  onChange={() => setImageSource("none")}
                  className="mt-1 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Subir sin imagen
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    La noticia se enviara igualmente como borrador, sin imagen
                    destacada.
                  </div>
                </div>
              </div>
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Prompt Gemini" tone="subtle">
          <p className="text-sm text-slate-600">
            No tienes imagen? Puedes generar una con Gemini usando este prompt:
          </p>
          <textarea
            readOnly
            value={webGeminiPrompt}
            rows={7}
            className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none"
          />
          <a
            href="https://gemini.google.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-slate-700 underline underline-offset-2"
          >
            Abrir Gemini
          </a>
        </SectionCard>
      </div>
    );
  }

  function renderLinkedinTab() {
    return (
      <div className="space-y-6">
        <SectionCard title="Post LinkedIn">
          {hasLinkedinPost ? (
            <>
              <textarea
                readOnly
                value={linkedinPost}
                rows={12}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-3">
                <CopyButton
                  copied={copyState.post}
                  onClick={() => copyToClipboard("post", linkedinPost)}
                  label="Copiar post"
                />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
              Esta noticia no tiene contenido de LinkedIn generado.
            </div>
          )}
        </SectionCard>

        <SectionCard title="Hashtags LinkedIn">
          <textarea
            readOnly
            value={linkedinHashtags}
            rows={4}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none"
            placeholder="Sin hashtags generados"
          />
          <div className="mt-3 flex flex-wrap gap-3">
            <CopyButton
              copied={copyState.hashtags}
              disabled={!hasLinkedinHashtags}
              onClick={() => copyToClipboard("hashtags", linkedinHashtags)}
              label="Copiar hashtags"
            />
            <CopyButton
              copied={copyState.complete}
              disabled={!completeLinkedinText}
              onClick={() => copyToClipboard("complete", completeLinkedinText)}
              label="Copiar post completo"
            />
          </div>
        </SectionCard>

        <SectionCard title="Imagen original">
          {hasOriginalImage ? (
            <>
              <PreviewImage src={item.featuredImageUrl} alt={itemTitle} />
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={item.featuredImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Abrir imagen
                </a>
                <a
                  href={item.featuredImageUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Descargar imagen
                </a>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
              Esta noticia no tiene foto original disponible.
            </div>
          )}
        </SectionCard>

        <SectionCard title="Prompt Gemini" tone="subtle">
          <p className="text-sm text-slate-600">
            Si prefieres una imagen nueva para LinkedIn, puedes generar una con Gemini usando este prompt:
          </p>
          <textarea
            readOnly
            value={linkedinGeminiPrompt}
            rows={7}
            className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-3">
            <CopyButton
              copied={copyState.prompt}
              onClick={() => copyToClipboard("prompt", linkedinGeminiPrompt)}
              label="Copiar prompt"
            />
            <a
              href="https://gemini.google.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Abrir Gemini
            </a>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 pb-6 pt-20 sm:px-6"
      onClick={handleBackdropClick}
    >
      <div className="flex max-h-[calc(100vh-6rem)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Aprobar salida editorial
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Decide si quieres preparar esta noticia para la web o para LinkedIn.
              </p>
              {renderModeTabs()}
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Cerrar modal"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Noticia seleccionada
            </div>
            <p className="mt-2 text-base font-medium text-slate-900">{itemTitle}</p>
          </div>

          {mode === MODES.WEB ? renderWebTab() : renderLinkedinTab()}

          {error ? (
            <section className="mt-6 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </section>
          ) : null}
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-4">
          {mode === MODES.WEB ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                {alreadyUploadedToWordPress
                  ? "Esta noticia ya fue enviada a WordPress. LinkedIn sigue disponible en la otra pestaña."
                  : "La noticia se creara en WordPress como borrador."}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSubmitWeb}
                  disabled={!canSubmitWeb}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {alreadyUploadedToWordPress
                    ? "Ya subida en WordPress"
                    : loading
                      ? "Subiendo..."
                      : "Subir noticia"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                LinkedIn se publica manualmente. Usa los botones de copiado y abre LinkedIn cuando quieras.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={openLinkedin}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Abrir LinkedIn
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
