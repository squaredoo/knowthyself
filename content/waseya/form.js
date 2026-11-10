/* Structure of the interactive will. Labels for each language are in ar.js, en.js, da.js.
   Field ids and table columns match older saved drafts (JSON), so old drafts still load. */
SQ.waseyaForm = {
  sections: [
    { id: 'sec1', fields: [['w_name', 'text'], ['w_id', 'text'], ['w_dob', 'date'], ['w_birthplace', 'text'], ['w_address', 'textarea'], ['w_phone', 'tel'], ['w_email', 'email']] },
    { id: 'sec2', fields: [['t_shahada', 'shahada']] },
    { id: 'sec3', fields: [['ex_name', 'text'], ['ex_contact', 'text'], ['ex2_name', 'text'], ['ex2_contact', 'text']], more: [['ex_notes', 'textarea']] },
    { id: 'sec4', fields: [['bur_place', 'text'], ['bur_washer', 'text'], ['bur_kafan', 'textarea'], ['bur_funeral', 'textarea']], more: [['bur_qabr', 'text'], ['bur_khatm', 'text']] },
    { id: 'sec5', table: 'debts', more: [['mazalim', 'textarea']] },
    { id: 'sec6', fields: [['khums', 'textarea'], ['fitra', 'textarea'], ['qada', 'textarea'], ['fidya', 'textarea'], ['kaffarat', 'textarea'], ['hajj', 'textarea']], more: [['ziyarat', 'textarea']] },
    { id: 'sec7', fields: [['estate_total', 'number'], ['obligations_total', 'number'], ['third_total', 'readonly']], table: 'thirds', check: true, more: [['charity_notes', 'textarea']] },
    { id: 'sec8', table: 'heirs', more: [['family_notes', 'textarea']] },
    { id: 'sec9', fields: [['w1', 'text'], ['w1c', 'text'], ['w2', 'text'], ['w2c', 'text'], ['will_date', 'date'], ['will_place', 'text']], more: [['legal_notes', 'textarea']] },
    { id: 'sec10', glossary: true }
  ],
  tables: {
    debts: ['party', 'type', 'amount', 'notes'],
    thirds: ['item', 'beneficiary', 'amount', 'notes'],
    heirs: ['name', 'relation', 'contact', 'notes']
  },
  progressKeys: ['w_name', 'w_dob', 'w_birthplace', 'ex_name', 'bur_place', 'will_date', 'will_place', 'w1', 'w2']
};
