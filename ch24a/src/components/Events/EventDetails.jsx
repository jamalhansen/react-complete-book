import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { queryClient } from "../../util/http.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent } from "../../util/http.js";
import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import { useState } from "react";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const {
    mutate,
    isPending: isPendingDelete,
    isError: isErrorDelete,
    error: errorDelete,
  } = useMutation({
    mutationFn: () => deleteEvent({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  const onDeleteHandler = () => {
    mutate({ id });
  };

  const onStartDeleteHandler = () => {
    setIsDeleting(true);
  };

  const onStopDeleteHandler = () => {
    setIsDeleting(false);
  };

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching Event Data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title={"An error occured"}
        message={error.info?.message || "Error fetching event."}
      />
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button
              type="button"
              onClick={onStartDeleteHandler}
              disabled={isPendingDelete}
            >
              Delete
            </button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={onStopDeleteHandler}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className="form-actions">
            {isPendingDelete && <p>Deleting... Please wait...</p>}
            {!isPendingDelete && (
              <>
                <button onClick={onStopDeleteHandler} className="button-text">
                  Cancel
                </button>
                <button onClick={onDeleteHandler} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDelete && (
            <ErrorBlock
              title={"An error occured"}
              message={
                error.info?.message ||
                "Error deleting event. Please try again later"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      {isErrorDelete && (
        <ErrorBlock
          title={"Delete error"}
          message={errorDelete.info?.message || "Error deleting event."}
        />
      )}

      <article id="event-details">{content}</article>
    </>
  );
}
