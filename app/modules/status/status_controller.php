<?php

/**
 * Status_controller class
 *
 * @package munkireport
 * @author Daniel W. Anner
 **/
class Status_controller extends Module_controller {
    public function __construct() {
        if (! $this->authorized()) {
            $obj = new View();
            $obj->view('json', array('msg' => array('error' =>'Not authorized')));
            die();
        }

        $this->module_path = dirname(__FILE__);
    }

    public function index() {
        echo "You've loaded the status module!";
    }

    public function save() {
        $out = array();

        // Sanitize
        $serial_number = post('serial_number');
        $status = post('status');
        if ($serial_number and $status) {
            if (authorized_for_serial($serial_number)) {
                $status = new Status_model;
                $status->retrieve_record($serial_number, 'section=?', array($section));
                $status->serial_number = $serial_number;
                $status->status = $status;
                $status->user = $_SESSION['user'];
                $status->timestamp = time();
                $status->save();

                $out['status'] = 'saved';
            } else {
                $out['status'] = 'error';
                $out['msg'] = 'Not authorized for this serial';
            }
        } else {
            $out['status'] = 'error';
            $out['msg'] = 'Missing data';
        }

        $obj = new View();
        $obj->view('json', array('msg' => $out));
    }

    public function retrieve($serial_number = '')
    {
        $out = array();

        $status = new Status_model;
        foreach ($status->retrieve_records($serial_number) as $obj) {
            $out[] = $obj->rs;
        }

        $obj = new View();
        $obj->view('json', array('msg' => $out));
    }

    public function update()
    {
    }

    public function delete()
    {
    }
}
