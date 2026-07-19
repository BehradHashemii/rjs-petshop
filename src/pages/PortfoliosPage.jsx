import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import portfoliosData from "../data/mockData.json";
import Loading from "../components/Loading";

const ITEMS_PER_PAGE = 9;

function PortfoliosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [portfolios, setPortfolios] = useState([]);

  const sortBy = searchParams.get("sortBy") || "desc";
  const tag = searchParams.get("tag") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setPortfolios(portfoliosData.portfolios || []);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const uniqueCategories = useMemo(() => {
    if (!Array.isArray(portfolios)) return [];
    return [...new Set(portfolios.map((item) => item.category))];
  }, [portfolios]);

  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    if (key !== "page") {
      newParams.set("page", "1");
    }

    setSearchParams(newParams);
  };

  const processedData = useMemo(() => {
    let filtered = Array.isArray(portfolios) ? [...portfolios] : [];

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (tag !== "all") {
      filtered = filtered.filter((item) => item.category === tag);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "desc" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [portfolios, searchQuery, tag, sortBy]);

  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
  const paginatedData = processedData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="portfolios-container">
      <div
        className="filters-section"
        style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
      >
        <input
          type="text"
          placeholder="جستجو در توضیحات و عنوان..."
          value={searchQuery}
          onChange={(e) => updateParams("search", e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => updateParams("sortBy", e.target.value)}
        >
          <option value="desc">جدیدترین پروژه‌ها</option>
          <option value="asc">قدیمی‌ترین پروژه‌ها</option>
        </select>

        <select
          value={tag}
          onChange={(e) => updateParams("tag", e.target.value)}
        >
          <option value="all">همه دسته‌بندی‌ها</option>
          {uniqueCategories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div
        className="portfolios-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <div
              key={item.id}
              className="glassBG"
              style={{
                // border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "20px",
                // borderRadius: "8px",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              )}

              <div style={{ marginTop: "1rem" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    background: "#eee",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                  }}
                >
                  {item.category}
                </span>
                <h3 style={{ margin: "0.5rem 0" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>
                  {item.description}
                </p>

                {/* رندر تکنولوژی‌ها */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginTop: "1rem",
                  }}
                >
                  {item.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "0.75rem",
                        border: "1px solid #ccc",
                        padding: "0.2rem 0.4rem",
                        borderRadius: "4px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}
                >
                  {item.liveUrl && (
                    <a href={item.liveUrl} target="_blank" rel="noreferrer">
                      مشاهده آنلاین
                    </a>
                  )}
                  {item.githubUrl && (
                    <a href={item.githubUrl} target="_blank" rel="noreferrer">
                      سورس کد
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>پروژه‌ای با این مشخصات یافت نشد.</p>
        )}
      </div>

      {/* دکمه‌های صفحه‌بندی */}
      {totalPages > 1 && (
        <div
          className="pagination"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => updateParams("page", (page - 1).toString())}
          >
            قبلی
          </button>
          <span>
            صفحه {page} از {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => updateParams("page", (page + 1).toString())}
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}

export default PortfoliosPage;
