// FILE: TesterPage.jsx
import "bootstrap/dist/css/bootstrap.min.css";

const TesterPage = () => {
  return (
    <div className="container-fluid py-5">
      <h2 className="text-center mb-4">🎨 CSS + Bootstrap 5 Layout Playground</h2>
      <p className="text-center text-muted mb-5">
        Experiment with containers, flexbox, grids, spacing, and responsive design
      </p>

      {/* ------------------------------------------------ */}
      {/* BASIC CONTAINERS */}
      {/* ------------------------------------------------ */}
      <section className="mb-5">
        <h4 className="text-primary mb-3">1️⃣ Basic Containers</h4>

        {/* Container vs Container-Fluid */}
        <div className="border border-danger p-3 mb-3">
          <div className="container border border-success p-3">
            <p className="fw-bold text-success mb-1">.container (fixed width)</p>
            <p className="small text-muted">Centers and limits width by breakpoint</p>
          </div>
        </div>

        <div className="border border-danger p-3">
          <div className="container-fluid border border-info p-3">
            <p className="fw-bold text-info mb-1">.container-fluid (full width)</p>
            <p className="small text-muted">Always stretches to full width</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* INTERMEDIATE: FLEXBOX BASICS */}
      {/* ------------------------------------------------ */}
      <section className="mb-5">
        <h4 className="text-warning mb-3">2️⃣ Flexbox Layouts</h4>

        <div className="d-flex border border-dark p-3 justify-content-between align-items-center">
          {/* Common classes you can try: 
              justify-content-start | justify-content-end | justify-content-center | justify-content-between | justify-content-around | justify-content-evenly
              align-items-start | align-items-center | align-items-end
          */}
          <div className="p-3 bg-primary text-white rounded">Box 1</div>
          <div className="p-3 bg-secondary text-white rounded">Box 2</div>
          <div className="p-3 bg-success text-white rounded">Box 3</div>
        </div>

        <div className="d-flex flex-column border border-info p-3 mt-3">
          {/* Try: flex-column-reverse | flex-row | flex-row-reverse */}
          <div className="p-2 bg-warning text-dark rounded">Column 1</div>
          <div className="p-2 bg-danger text-white rounded">Column 2</div>
          <div className="p-2 bg-primary text-white rounded">Column 3</div>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* ADVANCED: GRID SYSTEM */}
      {/* ------------------------------------------------ */}
      <section className="mb-5">
        <h4 className="text-success mb-3">3️⃣ Bootstrap Grid System</h4>

        {/* Try different breakpoints: col-4, col-md-6, col-lg-3, etc. */}
        <div className="container border border-secondary p-3">
          <div className="row g-3">
            <div className="col-6 col-md-3 border border-primary p-3 text-center">
              <strong>col-6 col-md-3</strong>
            </div>
            <div className="col-6 col-md-3 border border-warning p-3 text-center">
              <strong>col-6 col-md-3</strong>
            </div>
            <div className="col-6 col-md-3 border border-danger p-3 text-center">
              <strong>col-6 col-md-3</strong>
            </div>
            <div className="col-6 col-md-3 border border-success p-3 text-center">
              <strong>col-6 col-md-3</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* ADVANCED PRO MAX: FLEX UTILITIES + RESPONSIVENESS */}
      {/* ------------------------------------------------ */}
      <section className="mb-5">
        <h4 className="text-danger mb-3">4️⃣ Flex Utilities (Responsive Power)</h4>

        <div
          className="d-flex flex-wrap justify-content-center align-items-center gap-3 border border-primary p-4"
          style={{ minHeight: "200px" }}
        >
          {/* Try toggling breakpoints: flex-md-row, flex-sm-column, align-items-end, etc. */}
          <div className="p-3 bg-light border border-dark">Item A</div>
          <div className="p-3 bg-light border border-dark">Item B</div>
          <div className="p-3 bg-light border border-dark">Item C</div>
          <div className="p-3 bg-light border border-dark">Item D</div>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* ULTRA ++ LEVEL: COMBINED FLEX + GRID + NESTING */}
      {/* ------------------------------------------------ */}
      <section>
        <h4 className="text-info mb-3">5️⃣ Ultra ++ Layout Combo</h4>

        <div className="container-fluid border border-dark p-4">
          <div className="row">
            {/* Sidebar */}
            <div className="col-12 col-md-3 border border-danger p-3">
              <p className="fw-bold text-danger mb-2">Sidebar</p>
              <ul className="list-unstyled mb-0">
                <li className="py-1">Dashboard</li>
                <li className="py-1">Reports</li>
                <li className="py-1">Settings</li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-12 col-md-9 border border-success p-3">
              <p className="fw-bold text-success mb-2">Main Content (Nested Flex)</p>

              <div className="d-flex justify-content-around align-items-center flex-wrap border border-secondary p-3">
                <div className="p-3 bg-primary text-white rounded">Card 1</div>
                <div className="p-3 bg-warning text-dark rounded">Card 2</div>
                <div className="p-3 bg-danger text-white rounded">Card 3</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TesterPage;
