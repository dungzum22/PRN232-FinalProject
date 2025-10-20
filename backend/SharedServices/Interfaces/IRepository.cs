namespace SharedServices.Interfaces;

/// <summary>
/// Generic repository interface for CRUD operations
/// </summary>
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<List<T>> GetAllAsync();
    Task<List<T>> GetAsync(Func<T, bool> predicate);
    Task<T?> FirstOrDefaultAsync(Func<T, bool> predicate);
    Task<int> CountAsync(Func<T, bool>? predicate = null);
    Task AddAsync(T entity);
    Task AddRangeAsync(IEnumerable<T> entities);
    Task UpdateAsync(T entity);
    Task UpdateRangeAsync(IEnumerable<T> entities);
    Task DeleteAsync(T entity);
    Task DeleteRangeAsync(IEnumerable<T> entities);
    Task<bool> SaveChangesAsync();
}
