<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\CustomerType;
use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;

class HomeController extends AbstractController
{
	#[Route('/', name: 'home')]
    public function index(CustomerRepository $customerRepository): Response
    {
        $customers = $customerRepository->findAll();
        return $this->render('customers/customers.html.twig', [
            'customers' => $customers,
        ]);
    }
	
	#[Route('/add', name: 'home_add')]
	public function add(Request $request, EntityManagerInterface $entityManager): Response
	{
		$customer = new Customer();
        $form = $this->createForm(CustomerType::class, $customer);
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()){
			$entityManager->persist($customer);
			$entityManager->flush();
			$this->addFlash('success', 'Client ajouté');
			return $this->redirect($this->generateUrl('home'));
		}
        return $this->render('home/index.html.twig', [
            'form' => $form->createView(),
			'firstname' => false,
        ]);
	}
	
	#[Route('/{id}/edit', name: 'home_edit')]
	public function edit(?Customer $customer, Request $request, EntityManagerInterface $entityManager): Response
	{
		    if(!$customer){
				$customer = new Customer();
			}
			$form = $this->createForm(CustomerType::class, $customer);
			$form->handleRequest($request);
			if ($form->isSubmitted() && $form->isValid()){
				if(!$customer->getId()){
					$entityManager->persist($customer);
				}
				$entityManager->flush();
				$this->addFlash('success', 'Client modifié');
				return $this->redirect($this->generateUrl('home'));
			}
			return $this->render('home/index.html.twig', [
				'form' => $form->createView(),
				'firstname' => $customer->getFirstname(),
			]);
	}
	
	#[Route('/{id}/remove', name: 'home_remove')]
	public function remove(?Customer $customer, CustomerRepository $customerRepository, Request $request, EntityManagerInterface $entityManager): Response
	{
		    if(!$customer){
				$customer = new Customer();
			}
			if(!$customer->getId()){
				$entityManager->persist($customer);
			}
			$entityManager->remove($customer);
			$entityManager->flush();
			$this->addFlash('success', 'Client supprimé');
			$customers = $customerRepository->findAll();
			$this->render('home/index.html.twig', [
				'form' => $form->createView(),
				'firstname' => $customer->getFirstname(),
			]);
			// return $this->redirect($this->generateUrl('home'));
	}
	
	#[Route('/{id}/pdf', name: 'home_pdf')]
	public function pdfAction(?Customer $customer, CustomerRepository $customerRepository, Request $request, \Knp\Snappy\Pdf $knpSnappyPdf)
    {
		if(!$customer){
			$customer = new Customer();
		}
		$form = $this->createForm(CustomerType::class, $customer);
		$form->handleRequest($request);
        $html = $this->render('home/index.html.twig', [
			'form' => $form->createView(),
			'firstname' => $customer->getFirstname(),
		]);
        return new PdfResponse(
            $knpSnappyPdf->getOutputFromHtml($html),
            'file.pdf'
        );
    }
}
