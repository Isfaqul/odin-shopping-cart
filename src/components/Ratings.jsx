function Ratings({ rating, size, className, ratingCount }) {
  const fullStar = Math.floor(rating);
  const emptyStar = 5 - Math.ceil(rating);
  const halfStar = 5 - (fullStar + emptyStar);

  return (
    <section className={className}>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {fullStar > 0
            ? [..."-".repeat(fullStar)].map((star) => (
                <FullStar key={crypto.randomUUID()} className="fill-amber-400 " width={size} />
              ))
            : ""}

          {halfStar > 0
            ? [..."-".repeat(halfStar)].map((star) => (
                <HalfStar key={crypto.randomUUID()} className="fill-amber-400 " width={size} />
              ))
            : ""}

          {emptyStar > 0
            ? [..."-".repeat(emptyStar)].map((star) => (
                <EmptyStar key={crypto.randomUUID()} className="fill-neutral-300 " width={size} />
              ))
            : ""}
        </div>
        <p className="text-xs text-neutral-500">({ratingCount})</p>
      </div>
    </section>
  );
}

function FullStar(props) {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 158 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M97.16 57.506l.112.346h59.126l-47.541 34.54-.294.214.113.345 18.159 55.888-47.541-34.54-.294-.214-.294.214-47.542 34.54 18.16-55.888.113-.345-.294-.213L1.602 57.852h59.127l.112-.346L79 1.617l18.16 55.889z" />
    </svg>
  );
}

function HalfStar(props) {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 158 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.954.143v114.594l-48.74 35.411 18.635-57.351L.063 57.352h60.303L78.954.142z"
      />
      <path d="M97.635 57.352h60.303l-48.787 35.445 18.635 57.351L79 114.703l-48.786 35.445 18.635-57.351L.063 57.352h60.303L79 0l18.635 57.352zm-36.543 1H3.14l46.884 34.063-17.909 55.115L79 113.467l46.884 34.063-17.908-55.115 46.884-34.063H96.908L79 3.235 61.092 58.352z" />
    </svg>
  );
}

function EmptyStar(props) {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 158 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M97.16 57.506l.112.346h59.126l-47.541 34.54-.294.214.113.345 18.159 55.888-47.541-34.54-.294-.214-.294.214-47.542 34.54 18.16-55.888.113-.345-.294-.213L1.602 57.852h59.127l.112-.346L79 1.617l18.16 55.889z" />
    </svg>
  );
}

export default Ratings;
