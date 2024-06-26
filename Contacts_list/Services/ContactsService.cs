﻿using Contacts_list.Data;
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
            contact.Id = 0;
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ContactModel>> GetContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<ContactModel?> GetContactById(int id)
        {
            var dbcontact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (dbcontact == null) return null;

            return dbcontact;
        }

        public async Task<ContactModel?> UpdateContact(int id, ContactModel contact)
        {
            var dbContact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (dbContact == null) return null;

            dbContact.Name = contact.Name;
            dbContact.Company = contact.Company;
            dbContact.BusinessPhone = contact.BusinessPhone;
            dbContact.PrivatePhone = contact.PrivatePhone;
            dbContact.Email = contact.Email;

            await _context.SaveChangesAsync();

            return dbContact;
        }

        public async Task<ContactModel?> DeleteContactById(int id)
        {
            var dbcontact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (dbcontact == null) return null;

            _context.Contacts.Remove(dbcontact);
            await _context.SaveChangesAsync();

            return dbcontact;
        }
    }
}
