<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    public function testRequiresEmailAndLogin()
    {
        $this->json('POST', 'api/login')
          ->assertStatus(422);
    }

    public function testUserLoginsSuccessfully()
    {
//        $payload = ['email' => 'admin@ams.com', 'password' => '12345'];
//
//        $this->json('POST', 'api/login', $payload)
//          ->assertStatus(201);

    }
}
