// FILE: Pagination.jsx
const Pagination = ({ current = 1, total = 1, onChange = () => {}, styles = {} }) => {
  const pages = [];

  // Simple windowed page list, keep it small for UX
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + windowSize - 1);
  if (end - start < windowSize - 1) {
    start = Math.max(1, end - windowSize + 1);
  }

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav aria-label="Products pagination" style={styles.container}>
      <button
        type="button"
        onClick={() => current > 1 && onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous page"
        style={{
          ...styles.btn,
          ...(current === 1 ? styles.btnDisabled : {}),
        }}
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button type="button" onClick={() => onChange(1)} style={styles.btn}>
            1
          </button>
          {start > 2 && <span style={{ padding: "0 6px" }}>…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === current ? "page" : undefined}
          style={{
            ...styles.btn,
            ...(p === current ? styles.btnActive : {}),
          }}
        >
          {p}
        </button>
      ))}

      {end < total && (
        <>
          {end < total - 1 && <span style={{ padding: "0 6px" }}>…</span>}
          <button type="button" onClick={() => onChange(total)} style={styles.btn}>
            {total}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => current < total && onChange(current + 1)}
        disabled={current === total}
        aria-label="Next page"
        style={{
          ...styles.btn,
          ...(current === total ? styles.btnDisabled : {}),
        }}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
