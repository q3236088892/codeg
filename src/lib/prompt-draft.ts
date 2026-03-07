import type {
  AdaptedContentPart,
  UserResourceDisplay,
} from "@/lib/adapters/ai-elements-adapter"
import type { PromptDraft, PromptInputBlock } from "@/lib/types"

function isResourceLinkBlock(
  block: PromptInputBlock
): block is Extract<PromptInputBlock, { type: "resource_link" }> {
  return block.type === "resource_link"
}

export function getPromptDraftDisplayText(
  draft: PromptDraft,
  attachedResourcesFallback: string
): string {
  const trimmed = draft.displayText.trim()
  return trimmed || attachedResourcesFallback
}

export function buildUserMessageTextPartsFromDraft(
  draft: PromptDraft,
  attachedResourcesFallback: string
): AdaptedContentPart[] {
  return [
    {
      type: "text",
      text: getPromptDraftDisplayText(draft, attachedResourcesFallback),
    },
  ]
}

export function extractUserResourcesFromDraft(
  draft: PromptDraft
): UserResourceDisplay[] {
  return draft.blocks.filter(isResourceLinkBlock).map((resource) => ({
    name: resource.name,
    uri: resource.uri,
    mime_type: resource.mime_type ?? null,
  }))
}
