import skills from "../data/skills.json";

export default function Skills() {
  // On the mobile swipe rail, the category with the most items renders as
  // the tallest card and ends up alone in its column with empty space
  // below it — flag it so it can grow to fill that column exactly instead
  // of stopping short of the container's height (see .skills__group--fill).
  const tallestCategory = skills.reduce(
    (max, group) => (group.items.length > max.items.length ? group : max),
    skills[0]
  ).category;

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
            <div
              className={`skills__group${
                group.category === tallestCategory ? " skills__group--fill" : ""
              }`}
              key={group.category}
            >
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
