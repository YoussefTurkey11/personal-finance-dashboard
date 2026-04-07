export const convertToRichText = (text: string) => {
  return [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text,
        },
      ],
    },
  ];
};
