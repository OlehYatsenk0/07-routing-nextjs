import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";
import layoutCss from "../LayoutNotes.module.css";

type Params = { slug?: string[] };

function getTagFromSlug(slugArr?: string[]): string | undefined {
  if (!slugArr || slugArr.length === 0) return "all";
  return decodeURIComponent(slugArr[0]);
}

export default async function NotesFilterPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params; 
  const tag = getTagFromSlug(resolvedParams.slug);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag }],
    queryFn: () => fetchNotes({ page: 1, search: "", tag }),
  });

  return (
    <div className={layoutCss.notesWrapper}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </div>
  );
}