<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager)
    {
		$user = new User();
		$user->setEmail('admin@gmail.com');
        $password = $this->hasher->hashPassword($user, 'April_85');
        $user->setPassword($password);
		$user->setRoles(array('ROLE_ADMIN'));
		$manager->persist($user);

        $manager->persist($user);
		
		$user2 = new User();
		$user2->setEmail('com@gmail.com');
        $password2 = $this->hasher->hashPassword($user2, 'April_85');
        $user2->setPassword($password2);
		$user2->setRoles(array('ROLE_USER'));
		$manager->persist($user2);

        $manager->persist($user2);
        $manager->flush();
    }
}
