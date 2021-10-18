<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('my_users')->insert([
            'name' => 'user01',
            'birthday' => '19801122',
            'email' => 'user01@gmail.com',
        ]);
    }
}
