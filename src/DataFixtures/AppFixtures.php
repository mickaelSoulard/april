<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $customer = new Customer();
		$customer->setFirstname('Marion');
		$customer->setLastname('SOURICE');
        $customer->setAdress('1 rue de la tonnelle');
		$customer->setPostcode('85470');
		$customer->setCity('Brem sur mer');
		$customer->setEmail('m.sourice@gmail.com');
        $manager->persist($customer);
		
		$customer2 = new Customer();
		$customer2->setFirstname('Mickael');
		$customer2->setLastname('SOULARD');
        $customer2->setAdress('1 rue de la tonnelle');
		$customer2->setPostcode('85470');
		$customer2->setCity('Brem sur mer');
		$customer2->setEmail('soulard.mickael85@gmail.com');
        $manager->persist($customer2);

        $manager->flush();
    }
}
