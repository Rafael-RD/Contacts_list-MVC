using Contacts_list.Data;
using Contacts_list.Models;
using Contacts_list.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Contacts_list.Services
{
    public class ContactsService : IContactsService
    {
        private readonly DataContext _context;

        public ContactsService(DataContext context)
        {
            _context = context;
        }

        public async Task CreateContact(ContactModel contact)
        {
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
        }



        public async Task<ContactModel?> GetContactById(int id)
        {
            var dbcontact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (dbcontact == null) return null;

            return dbcontact;
        }

        public async Task UpdateContact(ContactModel contact)
        {
            var dbContact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == contact.Id);

            if (dbContact == null) throw new Exception("Contact not found");

            dbContact.Name = contact.Name;
            dbContact.Company = contact.Company;
            dbContact.BusinessPhone = contact.BusinessPhone;
            dbContact.PrivatePhone = contact.PrivatePhone;
            dbContact.Email = contact.Email;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteContactById(int id)
        {
            var dbcontact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (dbcontact == null) throw new Exception("Contact not found");


            _context.Contacts.Remove(dbcontact);
            await _context.SaveChangesAsync();
        }
    }
}
