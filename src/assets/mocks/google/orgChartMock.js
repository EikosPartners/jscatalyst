export default {
    columns: [ {type: 'string', id: 'Name'},
                { type: 'string', id: 'Manager'},
             {type: 'string', id: 'Tooltip'}],
    rows: [[{v:'Mike', f:'Mike'},
    '', 'The President'],
   [{v:'Jim', f:'Jim'},
    'Mike', 'VP'],
   ['Alice', 'Mike', ''],
   ['Bob', 'Jim', 'Bob Sponge'],
   ['Carol', 'Bob', '']]
}