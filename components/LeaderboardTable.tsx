import { LeaderboardEntry } from "@/lib/types";

// Вспомогательная функция для определения цвета медали или ранга
const getRankStyle = (rank: number) => {
  if (rank === 1) return { color: "#FFD700", fontWeight: "bold" }; // Золото
  if (rank === 2) return { color: "#C0C0C0", fontWeight: "bold" }; // Серебро
  if (rank === 3) return { color: "#CD7F32", fontWeight: "bold" }; // Бронза
  return { color: "rgba(255,255,255,0.5)" }; // Остальные чуть приглушенные
};

export function LeaderboardTable({ title, entries }: { title: string; entries: LeaderboardEntry[] }) {
  return (
    <div className="tableWrap">
      <div className="tableTitleRow">
        <div className="titleWithIcon">
          {/* Иконка кубка для презентабельности */}
          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🏆</span>
          <h3>{title}</h3>
        </div>
        <span className="muted">Репутация важнее шума</span>
      </div>
      
      <table className="boardTable">
        <thead>
          <tr>
            <th style={{ width: '40px' }}>#</th>
            <th>Игрок</th>
            <th style={{ textAlign: 'center' }}>Очки</th>
            <th style={{ textAlign: 'center' }}>Точность</th>
            <th style={{ textAlign: 'center' }}>Серия</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.tgUserId} className={entry.rank <= 3 ? "topRankRow" : ""}>
              {/* Ранг с цветовым выделением топ-3 */}
              <td style={getRankStyle(entry.rank)}>
                {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
              </td>
              
              <td>
                <div className="playerCell">
                  <div className="avatarPlaceholder">
                    {/* Первая буква имени как аватарка */}
                    {entry.displayName.charAt(0)}
                  </div>
                  <div className="playerInfo">
                    <strong>{entry.displayName}</strong>
                    <span className="playerTag">@{entry.username || entry.tgUserId}</span>
                  </div>
                </div>
              </td>

              <td className="pointsCell" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {entry.totalPoints}
              </td>

              <td style={{ textAlign: 'center' }}>
                <div className="accuracyBadge">
                   {entry.hitRate}%
                </div>
              </td>

              <td style={{ textAlign: 'center' }}>
                {/* Если серия больше 3, добавляем иконку огня */}
                <div className="streakCell">
                  {entry.streak}
                  {entry.streak >= 3 && <span title="В огне!" style={{ marginLeft: '4px' }}>🔥</span>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}