interface Iprops {
  message: string;
}

function ErrorsMessage({ message }: Iprops) {
  return message ? (
    <span className="text-red-700 block mt-1 text-sm font-semibold">
      {message}
    </span>
  ) : null;
}

export default ErrorsMessage;
