import getWeekdayCells from './get-weekday-cells';

const firstWeekOfJanHTML = `<table id="pt1:_FOr1:1:_FONSr2:0:MAnt2:2:teUpl:UPsp1:tcePce:tcdLv:5:stePse:dtItr:0:teMdp:mdp_cd1::cg" data-afr-yyyymm="2024-0" class="x12c" role="grid" cellpadding="0" cellspacing="0" border="0" width="100%" summary="January 2024">
    <tbody>
        <tr role="row" class="x12f">
            <th class="x12j" role="columnheader" scope="col" aria-label="Sunday">Sun</th>
            <th class="x12j" role="columnheader" scope="col" aria-label="Monday">Mon</th>
            <th class="x12j" role="columnheader" scope="col" aria-label="Tuesday">Tue</th>
            <th class="x12j" role="columnheader" scope="col" aria-label="Wednesday">Wed</th>
            <th class="x12j" role="columnheader" scope="col" aria-label="Thursday">Thu</th>
            <th class="x12j" role="columnheader" scope="col" aria-label="Friday">Fri</th>
            <th class="x12j" role="columnheader" scope="col" aria-label="Saturday">Sat</th>
        </tr>
        <tr role="row" class="x12d p_AFFirst">
            <td role="gridcell" tabindex="-1" class="x12m" data-afr-adfday="pm">31</td>
            <td role="gridcell" tabindex="-1" class="x12k" data-afr-adfday="cm">1</td>
            <td role="gridcell" tabindex="-1" class="x12k" data-afr-adfday="cm">2</td>
            <td role="gridcell" tabindex="0" class="x120 " data-afr-adfday="cm">3</td>
            <td role="gridcell" tabindex="-1" class="x12k" data-afr-adfday="cm">4</td>
            <td role="gridcell" tabindex="-1" class="x12k" data-afr-adfday="cm">5</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">6</td>
        </tr>
        <tr role="row" class="x12d">
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">7</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">8</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">9</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">10</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">11</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">12</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">13</td>
        </tr>
        <tr role="row" class="x12d">
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">14</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">15</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">16</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">17</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">18</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">19</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">20</td>
        </tr>
        <tr role="row" class="x12d">
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">21</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">22</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">23</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">24</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">25</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">26</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">27</td>
        </tr>
        <tr role="row" class="x12d p_AFLast">
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">28</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">29</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">30</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12k p_AFDisabled" data-afr-adfday="cm">31</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12n p_AFDisabled" data-afr-adfday="nm">1</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12n p_AFDisabled" data-afr-adfday="nm">2</td>
            <td role="gridcell" aria-disabled="true" tabindex="-1" class="x12n p_AFDisabled" data-afr-adfday="nm">3</td>
        </tr>
    </tbody>
</table>`;

test('getWeekdayCells works when Saturday is in previous month', async () => {
    document.body.innerHTML = firstWeekOfJanHTML;
    const weekdayCells = await getWeekdayCells();    
    expect(weekdayCells).toHaveLength(5);
    expect(weekdayCells[0].innerHTML).toBe("1"); // Monday
    expect(weekdayCells[4].innerHTML).toBe("5"); // Friday
});