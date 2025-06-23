export default function Modal(
    {
        modalType,
        editInput,
        setEditInput,
        setShowModal,
        handleUpdate,
        confirmationDelete
    }
) {
    return (
        <div
            className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center
                     bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 shadow-lg"
        >
            <div
                className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-lg"
            >
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
                    {modalType === "edit" ? "WANT TO EDIT NAME?" : "Delete Person!"}
                </div>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    {modalType === "edit" ? (
                        <p className="p-4">
                            <label>Enter New Name:</label>
                            <input type="text" className="input" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
                        </p>
                    ) : (
                        <p className="p-4">
                            Are you sure, you want to delete this user?
                        </p>
                    )}
                </div>
                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button type="button" onClick={() => setShowModal(false)} className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Cancel
                    </button>
                    {modalType === 'edit' ? (
                        <button type="button" onClick={handleUpdate} className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                            Change
                        </button>
                    ) : (
                        <button type="button" onClick={confirmationDelete} className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                            Delete
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}