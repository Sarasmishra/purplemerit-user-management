export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded max-w-sm w-full">
        <h2 className="font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-4">{message}</p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-black text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
