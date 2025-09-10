
interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorMessage({ title = "Error", message }: ErrorMessageProps) {

  console.error('Quise Error:', title, message);

  return (
    <div className="mt-4 p-4 rounded bg-red-50 border border-red-200">
      <h2 className="text-red-800 font-semibold text-sm mb-1">{title}</h2>
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  );
}