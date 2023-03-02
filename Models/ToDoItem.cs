using System.ComponentModel.DataAnnotations;
namespace TodoApi.Models
{

  public class TodoItem
  {
    public long Id { get; set; }

    [Required]
    public string? Description { get; set; }

    [Required]
    public bool IsComplete { get; set; }

    public DateTime? DateCompleted { get; set; }

    public virtual User? User { get; set; }
  }
}