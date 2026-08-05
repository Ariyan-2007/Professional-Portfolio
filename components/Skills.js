import skills from "../data/skills.json";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <p className="eyebrow">Capabilities</p>
        <h2 className="section-title">Skills</h2>
        <p className="section-sub">
          Tools and practices I reach for, grouped by category.
        </p>

        <div className="skills__grid">
          {skills.map((group) => (
            <div className="skills__group" key={group.category}>
              <h3 className="skills__group-title">{group.category}</h3>
              <div className="skills__tags">
                {group.items.map((item) => (
                  <span className="skills__tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
