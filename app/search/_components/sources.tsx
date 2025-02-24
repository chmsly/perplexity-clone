"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { SelectSource } from "@/db/schema"
import { truncate } from "@/lib/utils"

interface SourcesProps {
  sources: SelectSource[]
}

export default function Sources({ sources }: SourcesProps) {
  if (!sources.length) return null

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="sources">
        <AccordionTrigger>Sources ({sources.length})</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {sources.map(source => (
              <div key={source.id}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {truncate(source.title, 60)}
                </a>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
