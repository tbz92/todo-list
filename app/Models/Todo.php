<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property string $task
 * @property string $deadline
 * @property string $created_at
 * @property string $updated_at
 */

class Todo extends Model
{
    protected $table = 'todos';

    protected $fillable = ['task', 'deadline', 'created_at', 'updated_at'];
}
