interface SeoHeadProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function SeoHead({ schema }: SeoHeadProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((schemaItem, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItem) }}
        />
      ))}
    </>
  )
}
