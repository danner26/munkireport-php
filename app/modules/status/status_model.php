<?php
class Status_model extends \Model
{
    public function __construct($serial = '')
    {
        parent::__construct('id', 'status'); //primary key, tablename
        $this->rs['id'] = '';
        $this->rs['serial_number'] = $serial; //Serial number of machine
        $this->rs['user'] = ''; //Username of the user submitting the status
        $this->rs['status'] = ''; //Status of the machine
        $this->rs['timestamp'] = 0; //Timestamp
    }
}
