using Microsoft.AspNetCore.Mvc;
using Api.Repsitories;
//generic controller for everything
namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenericController<T> : ControllerBase where T : class
    {
        private readonly IRepository<T> _repository;

        public GenericController(IRepository<T> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _repository.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] T entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = GetEntityId(entity) }, entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] T entity)
        {
            if (!IsEntityIdMatch(entity, id))
                return BadRequest("ID mismatch");

            await _repository.UpdateAsync(entity);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return NotFound();

            await _repository.DeleteAsync(entity);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        private int GetEntityId(T entity)
        {
            var prop = typeof(T).GetProperty("Id");
            return (int)(prop?.GetValue(entity) ?? 0);
        }

        private bool IsEntityIdMatch(T entity, int id)
        {
            return GetEntityId(entity) == id;
        }
    }
}

