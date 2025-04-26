import ReactMarkdown from 'react-markdown';

export default function DocumentReading({ article }: { article: string }) {
  return (
    <div className=" mx-auto  ">
      <ReactMarkdown
        className={
          ' prose-strong:font-semibold  prose-headings:mb-4 prose-sm text-themeGray prose-headings:text-themeBlack prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl   '
        }
      >
        {article}
      </ReactMarkdown>
    </div>
  );
}
