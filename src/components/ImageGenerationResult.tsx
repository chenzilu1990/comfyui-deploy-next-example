"use client";
import { LoadingIcon } from "@/components/LoadingIcon";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ImageGenerationResult({
  runId,
  status,
  progress,
  liveStatus,
  imageUrl,
  className,
}: {
  runId: string;
  status: string;
  progress?: number;
  liveStatus?: string | null;
  imageUrl?: string;
} & Omit<React.ComponentProps<"div">, "children">) {
  const isLoading = status !== "success" && status !== "failed" && !imageUrl;
  const hasFinishedSuccessfully = status === "success" && imageUrl;

  return (
    <div
      className={cn(
        "border border-gray-200 w-full aspect-[512/768] rounded-lg relative",
        className
      )}
    >
      {hasFinishedSuccessfully && imageUrl && (
        <img
          className="w-full h-full object-contain"
          src={imageUrl}
          alt={`Generated image for run ${runId}`}
        ></img>
      )}
      {!hasFinishedSuccessfully && !isLoading && status === "failed" && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-red-500">
          Generation Failed
        </div>
      )}
      {!hasFinishedSuccessfully && isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 px-4">
          <div className="flex items-center justify-center gap-2">
            {status} <LoadingIcon />
          </div>
          {progress != undefined && progress >= 0 && (
            <Progress value={progress * 100} />
          )}
          <span className="text-sm text-center">{liveStatus ?? ""}</span>
        </div>
      )}
    </div>
  );
}
