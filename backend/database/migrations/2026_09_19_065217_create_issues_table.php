<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('title');
            $table->text('description')->nullable();

            $table->enum('priority', [
                'Low',
                'Medium',
                'High',
                'Critical',
            ])->default('Medium');

            $table->enum('status', [
                'Open',
                'In Progress',
                'Closed',
            ])->default('Open');

            $table->enum('label', [
                'Bug',
                'Feature',
                'Documentation',
                'UI/UX',
                'Backend',
                'Frontend',
            ])->default('Bug');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('issues');
    }
};