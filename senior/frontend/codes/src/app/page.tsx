import { BookList } from "@/components/BookTable";
import { Filter } from "@/components/Filter";
import { PageProps } from "../../.next/types/app/page";

export default async function Page(props: PageProps) {
  return (
    <>
      <div className="mx-auto py-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="font-bold text-2xl">Procure seu livro</h1>
          <p className="font-thin">Você pode procurar pelo seu livro preferido e até salvar o seus preferidos.</p>
        </div>

        <Filter.Root>
          <Filter.Item
            name="title"
            label="Título"
            placeholder="Digite o título do livro"
            defaultValue={props.searchParams.title || ""}
          />
          <Filter.Item
            name="author"
            label="Autor"
            placeholder="Digite o nome do autor"
            defaultValue={props.searchParams.author || ""}
          />
          <Filter.Item
            name="subject"
            label="Gênero"
            placeholder="Selecione o gênero do livro"
            defaultValue={props.searchParams.subject || ""}
          />
        </Filter.Root>
      </div>

      <BookList {...props.searchParams} />
    </>
  );
}
