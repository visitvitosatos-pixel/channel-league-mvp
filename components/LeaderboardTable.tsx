import { LeaderboardEntry } from "@/lib/types";

export function LeaderboardTable({ title, entries }: { title: string; entries: LeaderboardEntry[] }) {
  return (
    <div className="tableWrap">
      <div className="tableTitleRow">
        <h3>{title}</h3>
        <span className="muted">Репутация важнее шума</span>
      </div>
      <table className="boardTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Игрок</th>
            <th>Очки</th>
            <th>Точность</th>
            <th>Серия</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.tgUserId}>
              <td>{entry.rank}</td>
              <td>
                <div className="playerCell">
                  <strong>{entry.displayName}</strong>
                  <span>@{entry.username || entry.tgUserId}</span>
                </div>
              </td>
              <td>{entry.totalPoints}</td>
              <td>{entry.hitRate}%</td>
              <td>{entry.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
