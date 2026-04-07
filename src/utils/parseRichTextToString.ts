export const parseRichTextToString = (notes: any[]) => {
  return notes
    ?.map((note) => note.children?.map((child: any) => child.text).join(""))
    .join("\n");
};
