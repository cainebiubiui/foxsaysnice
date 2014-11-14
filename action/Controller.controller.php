<?php

/**
* 
*/
class controller
{
	private $link;
	
	function __construct()
	{
		$address='localhost';
        $username='root';
        $passcode='caine';
        $database='test';

        $this->link=new mysqli($address,$username,$passcode,$database);
	}

	 public function add($table,$values){
        $link=$this->link;

        $str='';
        foreach($values as $key=>$value){
            if($value=='now()'){
                $str .= "{$key}={$value},";
            }else{
                $str .= "{$key}='{$value}',";
            }
        }
        $str=rtrim($str,',');
        $sql="insert into $table set $str;";
        $link->query($sql);
        $e_row=$link->affected_rows;

        return $e_row;
    }

    public function get_specific_row($table,$index,$id){
        $link=$this->link;

        $sql="select * from $table where $index=$id;";
        $data=$link->query($sql);

        $arr=array();
        while($total_res=$data->fetch_array()){
            $single_res=array(
            	"id"       => $total_res['id'],
            	"name"     => $total_res['name'],
            	"address"  => $total_res['address'],
            	"phone"    => $total_res['phone'],
            	"info"     => $total_res['info'],
            	"time"     => $total_res['time']
            	);
            $arr[count($arr)]=$single_res;
        };

        return json_encode(array("info"=>$arr));
    }

}

?>