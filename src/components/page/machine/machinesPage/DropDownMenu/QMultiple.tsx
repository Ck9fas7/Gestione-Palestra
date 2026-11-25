import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireError,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { Button } from '@/components/ui/button'



interface QMultipleProps {
  getData: (data: FormDataEntryValue[]) => void
  brandList:{value:string}[]
  selected:FormDataEntryValue[]
}

export function QMultiple({ getData,brandList,selected }: QMultipleProps) {
    const items = [
    {
        choices: brandList,
        name: "context",
        required: false
    },
    ] as const
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const context = new FormData(event.currentTarget).getAll("context")
        getData(context)
    }

    return (
        <Questionnaire
        className="w-full min-w-0"
        items={items}
        shortcuts="letters"
        onSubmit={handleSubmit}
        >
        <QuestionnaireItem name="context" multiple required={false}>
            <QuestionnaireTitle>
            Filtra per Marchio
            </QuestionnaireTitle>
            <QuestionnaireDescription>
            Selezione i marchi
            </QuestionnaireDescription>
            <QuestionnaireChoices>
                {brandList.map((item)=>(
                    <QuestionnaireChoice
                        key={item.value}
                        value={item.value}
                        defaultChecked={selected.includes(item.value)}
                        className="whitespace-normal"
                    >
                        {item.value}
                    </QuestionnaireChoice>
                ))}
            </QuestionnaireChoices>
            <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
            <Button
                type="button"
                variant="ghost"
                className="col-start-1 justify-self-start"
                onClick={() => getData([])}
            >
                Rimuovi filtri
            </Button>
            <QuestionnaireSubmit>Filter</QuestionnaireSubmit>
        </QuestionnaireActions>
        </Questionnaire>
    )
}