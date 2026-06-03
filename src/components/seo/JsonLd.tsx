// Renders a JSON-LD <script> into the document. Works in both Server and Client
// Components since it's regular body content, not the Metadata API.

type JsonLdData = Record<string, unknown> | Record<string, unknown>[]

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject as ld+json.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
