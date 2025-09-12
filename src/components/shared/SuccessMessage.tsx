
interface SuccessMessageProps {
  message: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 shadow-md rounded">
      <h3 className="text-lg font-semibold">Success!</h3>
      <p>{message}</p>
    </div>
  );
};
