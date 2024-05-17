using Contacts_list.Models;
using Contacts_list.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Contacts_list.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsService _contactsService;

        public ContactsController(IContactsService contactsService)
        {
            _contactsService = contactsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactModel>>> GetContacts()
        {
            return Ok(await _contactsService.GetContacts());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactModel>> GetContactById(int id)
        {
            var contact = await _contactsService.GetContactById(id);

            if (contact == null) return NotFound("Contact not found!");

            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact(ContactModel contact)
        {
            await _contactsService.CreateContact(contact);

            return Ok("Contact created!");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, ContactModel contact)
        {
            var updatedContact = await _contactsService.UpdateContact(id, contact);

            if (updatedContact == null) return NotFound("Contact not found!");

            return Ok("Contact updated!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var deletedContact = await _contactsService.DeleteContactById(id);
            
            if (deletedContact == null) return NotFound("Contact not found!");

            return Ok("Contact Deleted!");
        }
    }
}
