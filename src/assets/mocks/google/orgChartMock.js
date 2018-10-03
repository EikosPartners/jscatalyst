export default {
    columns: [ {type: 'string', id: 'Name'},
                { type: 'string', id: 'Manager'},
             {type: 'string', id: 'Tooltip'}],
    rows: [[{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'},
    '', 'The President'],
   [{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'},
    'Mike', 'VP'],
   ['Alice', 'Mike', ''],
   ['Bob', 'Jim', 'Bob Sponge'],
   ['Carol', 'Bob', '']]
}