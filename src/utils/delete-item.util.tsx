interface DeleteItemProp {
  deleteTitle: string;
  deleteMessage: string;
  showDeleteItem: boolean;
  cancelButton: string;
  submitButton: string;
  deleteItem: (value: boolean) => void;
}

export const DeleteItem = (props: DeleteItemProp) => {
  const { deleteItem, deleteMessage, deleteTitle, showDeleteItem,cancelButton, submitButton } = props;
  const tabIndex = -1;
  console.log("In DeleteItem : ", showDeleteItem); 
  return (
    <>
    {
        showDeleteItem &&
    <div
      className="modal fade show d-block mt-5"
      id="exampleModal"
      tabIndex={tabIndex}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {deleteTitle}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => deleteItem(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{deleteMessage}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => deleteItem(false)}
            >
              {cancelButton}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(true)}
            >
              {submitButton}
            </button>
          </div>
        </div>
      </div>
    </div>
}
</>
  );
};
