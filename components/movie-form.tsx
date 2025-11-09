import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { useMovieForm, type MovieFormValues } from "@/hooks/use-movie-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type MovieFormVariant = "create" | "edit";

interface MovieFormProps {
  title: string;
  submitLabel: string;
  submittingLabel: string;
  cancelHref: string;
  onSubmit: (values: MovieFormValues) => void | Promise<void>;
  initialValues?: Partial<MovieFormValues>;
  existingImageLabel?: string;
  existingImageUrl?: string;
  variant?: MovieFormVariant;
}

type ValidationErrors = Partial<Record<keyof MovieFormValues, string>>;

export function MovieForm({
  title,
  submitLabel,
  submittingLabel,
  cancelHref,
  onSubmit,
  initialValues,
  existingImageLabel,
  existingImageUrl,
  variant = "create",
}: MovieFormProps) {
  const t = useTranslations("movies.form");
  const { values, updateImage, updateTitle, updateYear } = useMovieForm({
    initialValues,
  });
  const [preview, setPreview] = useState<string | null>(
    existingImageUrl ?? null
  );
  const previousObjectUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleFieldId = useId();
  const yearFieldId = useId();
  const imageFieldErrorId = useId();

  const maxYear = useMemo(() => new Date().getFullYear() + 1, []);
  const requiresImage = variant === "create";

  const getTitleError = useCallback(
    (value: string) => {
      if (!value.trim()) {
        return t("validation.titleRequired");
      }
      return undefined;
    },
    [t]
  );

  const getYearError = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) {
        return t("validation.yearRequired");
      }
      const parsed = Number(trimmed);
      if (!Number.isInteger(parsed)) {
        return t("validation.yearInvalid", { maxYear });
      }
      if (parsed < 1888 || parsed > maxYear) {
        return t("validation.yearInvalid", { maxYear });
      }
      return undefined;
    },
    [maxYear, t]
  );

  const getImageError = useCallback(
    (hasImage: boolean) => {
      if (requiresImage && !hasImage) {
        return t("validation.imageRequired");
      }
      return undefined;
    },
    [requiresImage, t]
  );

  const upsertError = useCallback(
    (field: keyof ValidationErrors, message?: string) => {
      setErrors((prev) => {
        if (message) {
          if (prev[field] === message) {
            return prev;
          }
          return { ...prev, [field]: message };
        }
        if (prev[field]) {
          const { [field]: _removed, ...rest } = prev;
          return rest;
        }
        return prev;
      });
    },
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult: ValidationErrors = {};

    const titleError = getTitleError(values.title);
    if (titleError) {
      validationResult.title = titleError;
    }

    const yearError = getYearError(values.year);
    if (yearError) {
      validationResult.year = yearError;
    }

    const imageError = getImageError(
      Boolean(values.image ?? preview ?? existingImageUrl)
    );
    if (imageError) {
      validationResult.image = imageError;
    }

    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      return;
    }

    setIsSubmitting(true);
    try {
    await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    updateImage(file);

    if (previousObjectUrlRef.current) {
      URL.revokeObjectURL(previousObjectUrlRef.current);
      previousObjectUrlRef.current = null;
    }

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      previousObjectUrlRef.current = objectUrl;
      setPreview(objectUrl);
      upsertError("image", undefined);
    } else {
      setPreview(existingImageUrl ?? null);
      const hasImage = Boolean(existingImageUrl);
      upsertError("image", getImageError(hasImage));
    }
  };

  useEffect(() => {
    return () => {
      if (previousObjectUrlRef.current) {
        URL.revokeObjectURL(previousObjectUrlRef.current);
      }
    };
  }, []);

  const overlayLabel = useMemo(
    () =>
      variant === "edit" ? t("fields.dropOtherImage") : t("fields.dropImage"),
    [variant, t]
  );

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-12">
          {title}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <label
              htmlFor="image-upload"
              className="block cursor-pointer"
              aria-describedby={errors.image ? imageFieldErrorId : undefined}
            >
              <div
                className={cn(
                  "ds-dropzone relative mx-auto max-w-[var(--ds-form-preview-width)] overflow-hidden rounded-2xl border-2 border-dashed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/60 focus-visible:ring-[var(--ds-color-primary)]",
                  errors.image
                    ? "border-red-400/80"
                    : "border-white/30 hover:border-white/60"
                )}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Selected movie artwork"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ height: "var(--ds-form-preview-height)" }}
                    />
                    <div className="absolute inset-0 bg-black/35" />
                  </>
                ) : null}
                <div
                  className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-6 text-center sm:p-12"
                  style={{ height: "var(--ds-form-preview-height)" }}
                >
                  <Plus
                    className="h-12 w-12 text-white sm:h-16 sm:w-16"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {overlayLabel}
                  </p>
                </div>
              </div>
            </label>
            {errors.image ? (
              <p
                id={imageFieldErrorId}
                className="mt-2 text-sm font-medium text-red-300"
              >
                {errors.image}
              </p>
            ) : existingImageLabel ? (
              <p className="mt-2 text-sm text-white/60">{existingImageLabel}</p>
            ) : null}
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Input
                id={titleFieldId}
                placeholder={t("fields.title")}
                value={values.title}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  updateTitle(nextValue);
                  upsertError("title", getTitleError(nextValue));
                }}
                className={cn(
                  "ds-form-field placeholder-gray-400",
                  errors.title && "border-red-400/80 focus-visible:ring-red-400/40"
                )}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={
                  errors.title ? `${titleFieldId}-error` : undefined
                }
                disabled={isSubmitting}
              />
              {errors.title ? (
                <p
                  id={`${titleFieldId}-error`}
                  className="mt-2 text-sm font-medium text-red-300"
                >
                  {errors.title}
                </p>
              ) : null}
            </div>

            <div>
              <Input
                id={yearFieldId}
                type="number"
                placeholder={t("fields.publishingYear")}
                value={values.year}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  updateYear(nextValue);
                  upsertError("year", getYearError(nextValue));
                }}
                className={cn(
                  "ds-form-field placeholder-gray-400",
                  errors.year && "border-red-400/80 focus-visible:ring-red-400/40"
                )}
                aria-invalid={Boolean(errors.year)}
                aria-describedby={
                  errors.year ? `${yearFieldId}-error` : undefined
                }
                disabled={isSubmitting}
                inputMode="numeric"
              />
              {errors.year ? (
                <p
                  id={`${yearFieldId}-error`}
                  className="mt-2 text-sm font-medium text-red-300"
                >
                  {errors.year}
                </p>
              ) : null}
            </div>

            <div className="flex gap-3 pt-4 sm:gap-4">
              <Button
                asChild
                variant="outline"
                size="form"
                className="flex-1"
                aria-disabled={isSubmitting}
              >
                <Link
                  href={cancelHref}
                  aria-disabled={isSubmitting}
                  onClick={(event) => {
                    if (isSubmitting) {
                      event.preventDefault();
                    }
                  }}
                >
                  {t("fields.cancel")}
                </Link>
              </Button>
              <Button
                type="submit"
                size="form"
                className="flex-1"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner className="size-4" />
                    <span>{submittingLabel}</span>
                  </span>
                ) : (
                  submitLabel
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
