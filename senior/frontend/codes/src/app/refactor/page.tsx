import { Input, Button } from "@/components/ui";
import { getBooksAllBooks } from "@/services/books.service";

export default async function RefactorPage() {

  const { data, error, success } = await getBooksAllBooks();

  if (!success && error) {
    return <div>Erro ao buscar livros.</div>;
  }

  if (!data || data.length === 0) {
    return <div>Nenhum livro encontrado.</div>;
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Document Finder</h1>
        <div>
          <label>Autor: </label>
          <Input type="text" placeholder="Digite o autor" />
        </div>
        <div>
          <label>Livro: </label>
          <Input type="text" placeholder="Digite o título do livro" />
        </div>
        <div>
          <label>Biografia: </label>
          <Input type="text" placeholder="Digite a biografia" />
        </div>
        <Button>Buscar</Button>
      </div>

      <div style={{ padding: "20px" }}>
        <h2>Livros encontrados:</h2>
        <ul>
          {data.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} - {book.biography}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}