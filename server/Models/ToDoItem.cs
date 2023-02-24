namespace TodoApi.Models;

public class TodoItem
{
  public long Id { get; set; }
  public string? Description { get; set; }
  public bool IsComplete { get; set; }

  public DateTime? DateCompleted { get; set; }
}