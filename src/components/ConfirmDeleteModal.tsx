import { MutableRefObject } from "react"

interface Props {
    modalConfirmDeleteRef: MutableRefObject<HTMLDialogElement | null>
    text: string
    onClickConfirmDelete(): void
}

export const ConfirmDeleteModal = ({ modalConfirmDeleteRef, text, onClickConfirmDelete }: Props) => {
    return (
        <>
            <dialog
                className="modal modal-bottom sm:modal-middle"
                ref={modalConfirmDeleteRef}
            >
                <div className="modal-box">

                    <p className="py-4">{text}</p>
                    <div className="modal-action">
                        <form >
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={() => {
                                    onClickConfirmDelete()
                                    modalConfirmDeleteRef.current?.close()
                                }}
                            >Eliminar</button>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn"
                            >Cerrar</button>
                        </form>

                    </div>
                </div>
            </dialog>
        </>
    )
}
