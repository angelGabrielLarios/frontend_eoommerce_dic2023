import { MutableRefObject } from "react"

interface Props {
    modalConfirDeleteRef: MutableRefObject<HTMLDialogElement | null>
    text: string
    onClickConfirmDelete(): void


}

export const ConfirmDeleteModal = ({ modalConfirDeleteRef, text, onClickConfirmDelete }: Props) => {
    return (
        <>
            <dialog
                className="modal modal-bottom sm:modal-middle"
                ref={modalConfirDeleteRef}
            >
                <div className="modal-box">

                    <p className="py-4">{text}</p>
                    <div className="modal-action">
                        <form >
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={onClickConfirmDelete}
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
